package com.nail.backend.domain.qna.service;


import com.amazonaws.services.s3.AmazonS3Client;
import com.nail.backend.domain.authentication.service.AwsS3Service;
import com.nail.backend.domain.qna.db.entity.Qna;
import com.nail.backend.domain.qna.db.entity.QnaAnswer;
import com.nail.backend.domain.qna.db.repository.QnaAnswerRepository;
import com.nail.backend.domain.qna.db.repository.QnaRepository;
import com.nail.backend.domain.qna.db.repository.QnaRepositorySupport;
import com.nail.backend.domain.qna.request.QnaAnswerModifyPutReq;
import com.nail.backend.domain.qna.request.QnaAnswerRegisterPostReq;
import com.nail.backend.domain.qna.request.QnaModifyPutReq;
import com.nail.backend.domain.qna.request.QnaRegisterPostReq;
import com.nail.backend.domain.qna.response.QnaGetRes;
import com.nail.backend.domain.user.db.entity.User;
import com.nail.backend.domain.user.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service("QnaService")
public class QnaServiceImpl implements QnaService {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3Client amazonS3Client;

    @Autowired
    QnaRepository qnaRepository;

    @Autowired
    QnaAnswerRepository qnaAnswerRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    QnaRepositorySupport qnaRepositorySupport;


    @Autowired
    AwsS3Service awsS3Service;

//    CREATE_________________________________________
    @Override
    @Transactional
    public Qna qnaOfNailRegister(MultipartFile qnaFile, QnaRegisterPostReq qnaRegisterPostReq) throws IOException {

        // file ?????????
        String fileName  = awsS3Service.createFileName(qnaFile.getOriginalFilename());

        //?????? ?????? ??????
//        System.getProperty => ????????? ????????? ?????? ????????? ?????? ??? ??????. (user.dir = ?????? ?????? ??????????????? ?????????)
        File file = new File(System.getProperty("user.dir")+ fileName);

        //?????? ??????
        qnaFile.transferTo(file);

        //S3 ?????? ?????????
        awsS3Service.uploadOnS3(fileName, file);

        //?????? ??????
        String qnaFileUrl = amazonS3Client.getUrl(bucket,fileName).toString();

        //?????? ??????
        file.delete();


        // ????????? ?????? ?????????

        // ?????? ????????? 3 -> ????????????
        Qna qna = Qna.builder()
                .userSeq(qnaRegisterPostReq.getUserSeq())
                .qnaTitle(qnaRegisterPostReq.getQnaTitle())
                .qnaDesc(qnaRegisterPostReq.getQnaDesc())
                .qnaImgUrl(qnaFileUrl)
                .qnaType(3)
                .qnaDesignerSeq(qnaRegisterPostReq.getQnaDesignerSeq())
                .qnaNailartSeq(qnaRegisterPostReq.getQnaNailartSeq())
                .qnaIsPrivated(qnaRegisterPostReq.isQnaIsPrivated())
                .qnaRegedAt(LocalDateTime.now())
                .build();

        Qna saveQna = qnaRepository.save(qna);
        return saveQna;
    }


    @Override
    @Transactional
    public Qna qnaToDesignerRegister(QnaRegisterPostReq qnaRegisterPostReq) {

        // ?????? ????????? 0 -> ????????????
        // ?????? ????????? 1 -> ????????? ??????
        // ?????? ????????? 2 -> ?????? ??????
        Qna qna = Qna.builder()
                .userSeq(qnaRegisterPostReq.getUserSeq())
                .qnaTitle(qnaRegisterPostReq.getQnaTitle())
                .qnaDesc(qnaRegisterPostReq.getQnaDesc())
                .qnaType(qnaRegisterPostReq.getQnaType())
                .qnaDesignerSeq(qnaRegisterPostReq.getQnaDesignerSeq())
                .qnaRegedAt(LocalDateTime.now())
                .build();

        Qna saveQna = qnaRepository.save(qna);
        return saveQna;
    }
    @Override
    @Transactional
    public QnaAnswer qnaAnswerRegister(QnaAnswerRegisterPostReq qnaAnswerRegisterPostReq){

        QnaAnswer qnaAnswer = QnaAnswer.builder()
                .qnaSeq(qnaAnswerRegisterPostReq.getQnaSeq())
                .qnaAnswerDesc(qnaAnswerRegisterPostReq.getQnaAnswerDesc())
                .build();
        QnaAnswer saveQnaAnswer = qnaAnswerRepository.save(qnaAnswer);

        // ?????? ?????? update
        qnaRepositorySupport.updateIsAnswered(qnaAnswerRegisterPostReq.getQnaSeq());

        return saveQnaAnswer;
    }



//    READ___________________________________________
    @Override
    @Transactional
    public QnaGetRes getQna(Long qnaSeq){
        Qna qna = qnaRepository.findById(qnaSeq).orElse(null);
        User user = userRepository.findByUserSeq(qna.getUserSeq());
        QnaAnswer qnaAnswer = qnaAnswerRepository.findQnaAnswerByQnaSeq(qnaSeq);

        QnaGetRes qnaGetRes = new QnaGetRes();

        qnaGetRes.setQnaSeq(qna.getQnaSeq());
        qnaGetRes.setUserSeq(user.getUserSeq());
        qnaGetRes.setUserNickname(user.getUserNickname());
        qnaGetRes.setQnaTitle(qna.getQnaTitle());
        qnaGetRes.setQnaDesc(qna.getQnaDesc());
        qnaGetRes.setQnaType(qna.getQnaType());
        qnaGetRes.setQnaImgUrl(qna.getQnaImgUrl());
        qnaGetRes.setQnaDesignerSeq(qna.getQnaDesignerSeq());
        qnaGetRes.setQnaNailartSeq(qna.getQnaNailartSeq());
        qnaGetRes.setQnaIsAnswered(qna.isQnaIsAnswered());
        qnaGetRes.setQnaIsPrivated(qna.isQnaIsPrivated());
        qnaGetRes.setQnaRegedAt(qna.getQnaRegedAt());
        qnaGetRes.setQnaAnswer(qnaAnswer);

        return qnaGetRes;
    }

    @Override
    @Transactional
    public Page<QnaGetRes> getQnaListByUser(Pageable pageable, Long userSeq, int qnaType){
        Page<Qna> qnaList = qnaRepository.findAllByUserSeqAndQnaType(pageable,userSeq,qnaType);
        List<QnaGetRes> qnaGetResList = new ArrayList<>();
        long total = qnaList.getTotalElements();

        for (Qna qna : qnaList) {
            QnaGetRes qnaGetRes = new QnaGetRes();

            User user = userRepository.findByUserSeq(qna.getUserSeq());
            QnaAnswer qnaAnswer = qnaAnswerRepository.findQnaAnswerByQnaSeq(qna.getQnaSeq());

            qnaGetRes.setQnaSeq(qna.getQnaSeq());
            qnaGetRes.setUserSeq(user.getUserSeq());
            qnaGetRes.setUserNickname(user.getUserNickname());
            qnaGetRes.setQnaTitle(qna.getQnaTitle());
            qnaGetRes.setQnaDesc(qna.getQnaDesc());
            qnaGetRes.setQnaType(qna.getQnaType());
            qnaGetRes.setQnaImgUrl(qna.getQnaImgUrl());
            qnaGetRes.setQnaDesignerSeq(qna.getQnaDesignerSeq());
            qnaGetRes.setQnaNailartSeq(qna.getQnaNailartSeq());
            qnaGetRes.setQnaIsAnswered(qna.isQnaIsAnswered());
            qnaGetRes.setQnaIsPrivated(qna.isQnaIsPrivated());
            qnaGetRes.setQnaRegedAt(qna.getQnaRegedAt());
            qnaGetRes.setQnaAnswer(qnaAnswer);

            qnaGetResList.add(qnaGetRes);
        }

        if (qnaList.stream().count() == 0) {  // Qna ?????????
            return null;
        }
        Page<QnaGetRes> res = new PageImpl<>(qnaGetResList, pageable, total);

        return res;
    }

    @Override
    @Transactional
    public Page<QnaGetRes> getQnaListByDesignerSeq(Pageable pageable, Long designerSeq, int qnaType){
        Page<Qna> qnaList = qnaRepository.findAllByQnaDesignerSeqAndQnaType(designerSeq, pageable, qnaType);
        List<QnaGetRes> qnaGetResList = new ArrayList<>();
        long total = qnaList.getTotalElements();

        for (Qna qna : qnaList) {
            QnaGetRes qnaGetRes = new QnaGetRes();

            User user = userRepository.findByUserSeq(qna.getUserSeq());
            QnaAnswer qnaAnswer = qnaAnswerRepository.findQnaAnswerByQnaSeq(qna.getQnaSeq());

            qnaGetRes.setQnaSeq(qna.getQnaSeq());
            qnaGetRes.setUserSeq(user.getUserSeq());
            qnaGetRes.setUserNickname(user.getUserNickname());
            qnaGetRes.setQnaTitle(qna.getQnaTitle());
            qnaGetRes.setQnaDesc(qna.getQnaDesc());
            qnaGetRes.setQnaType(qna.getQnaType());
            qnaGetRes.setQnaImgUrl(qna.getQnaImgUrl());
            qnaGetRes.setQnaDesignerSeq(qna.getQnaDesignerSeq());
            qnaGetRes.setQnaNailartSeq(qna.getQnaNailartSeq());
            qnaGetRes.setQnaIsAnswered(qna.isQnaIsAnswered());
            qnaGetRes.setQnaIsPrivated(qna.isQnaIsPrivated());
            qnaGetRes.setQnaRegedAt(qna.getQnaRegedAt());
            qnaGetRes.setQnaAnswer(qnaAnswer);

            qnaGetResList.add(qnaGetRes);
        }

        if (qnaList.stream().count() == 0) {  // Qna ?????????
            return null;
        }
        Page<QnaGetRes> res = new PageImpl<>(qnaGetResList, pageable, total);

        return res;
    }

    @Override
    @Transactional
    public Page<QnaGetRes> getQnaListByNailart(Pageable pageable, Long nailartSeq){
        Page<Qna> qnaList = qnaRepository.findAllByQnaNailartSeq(pageable,nailartSeq);
        List<QnaGetRes> qnaGetResList = new ArrayList<>();
        long total = qnaList.getTotalElements();

        for (Qna qna : qnaList) {
            QnaGetRes qnaGetRes = new QnaGetRes();

            User user = userRepository.findByUserSeq(qna.getUserSeq());
            QnaAnswer qnaAnswer = qnaAnswerRepository.findQnaAnswerByQnaSeq(qna.getQnaSeq());

            qnaGetRes.setQnaSeq(qna.getQnaSeq());
            qnaGetRes.setUserSeq(user.getUserSeq());
            qnaGetRes.setUserNickname(user.getUserNickname());
            qnaGetRes.setQnaTitle(qna.getQnaTitle());
            qnaGetRes.setQnaDesc(qna.getQnaDesc());
            qnaGetRes.setQnaType(3);
            qnaGetRes.setQnaImgUrl(qna.getQnaImgUrl());
            qnaGetRes.setQnaDesignerSeq(qna.getQnaDesignerSeq());
            qnaGetRes.setQnaNailartSeq(qna.getQnaNailartSeq());
            qnaGetRes.setQnaIsAnswered(qna.isQnaIsAnswered());
            qnaGetRes.setQnaIsPrivated(qna.isQnaIsPrivated());
            qnaGetRes.setQnaRegedAt(qna.getQnaRegedAt());
            qnaGetRes.setQnaAnswer(qnaAnswer);

            qnaGetResList.add(qnaGetRes);
        }

        if (qnaList.stream().count() == 0) {  // Qna ?????????
            return null;
        }
        Page<QnaGetRes> res = new PageImpl<>(qnaGetResList, pageable, total);

        return res;
    }


//    UPDATE_________________________________________

    @Override
    @Transactional
    public Long qnaModify(QnaModifyPutReq qnaModifyPutReq){

        // ?????? Qna??? ???????????? ??????, ???????????? ????????? 0 ??????

        if(qnaRepository.findById(qnaModifyPutReq.getQnaSeq()).isPresent()){
            Long execute = qnaRepositorySupport.updateQnaByQnaSeq(qnaModifyPutReq);
            return execute;
        }
        else return 0L;
    }

    @Override
    @Transactional
    public  Long qnaAnswerModify(QnaAnswerModifyPutReq qnaAnswerModifyPutReq){

        //?????? QnaAnswer??? ???????????? ??????, ???????????? ????????? 0 ??????
        if(qnaAnswerRepository.findById(qnaAnswerModifyPutReq.getQnaAnswerSeq()).isPresent()){
            Long execute = qnaRepositorySupport.updateQnaAnswerByQnaAnserSeq(qnaAnswerModifyPutReq);
            return execute;
        }
        else return 0L;
    }
//    DELETE_________________________________________

    @Override
    @Transactional
    public boolean qnaRemove(Long qnaSeq){

        if(qnaRepository.findById(qnaSeq).isPresent()){
            qnaRepository.deleteById(qnaSeq);
            return true;
        }
        return false;
    }

    @Override
    @Transactional
    public boolean qnaAnswerRemove(Long qnaAnswerSeq){

        if(qnaAnswerRepository.findById(qnaAnswerSeq).isPresent()){
            QnaAnswer qnaAnswer = qnaAnswerRepository.findById(qnaAnswerSeq).orElse(null);
            qnaAnswerRepository.deleteById(qnaAnswerSeq);

            // qnaAnswer - false??? ??????
            qnaRepositorySupport.updateIsAnsweredFalse(qnaAnswer.getQnaSeq());
            return true;
        }
        return false;
    }
}
