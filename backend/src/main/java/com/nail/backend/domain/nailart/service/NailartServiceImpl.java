package com.nail.backend.domain.nailart.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.nail.backend.domain.nailart.db.entity.Nailart;
import com.nail.backend.domain.nailart.db.entity.NailartImg;
import com.nail.backend.domain.nailart.db.repository.NailartRepository;
import com.nail.backend.domain.nailart.request.NailartRegisterPostReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.UUID;

import static com.google.common.io.Files.getFileExtension;

@Service
public class NailartServiceImpl implements NailartService{

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private AmazonS3 amazonS3;

    @Autowired
    NailartRepository nailartRepository;

    private String createFileName(String fileName) {
        return UUID.randomUUID().toString().concat(getFileExtension(fileName));
    }

    private String getFileExtension(String fileName) {
        try {
            return fileName.substring(fileName.lastIndexOf("."));
        } catch (StringIndexOutOfBoundsException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일(" + fileName + ") 입니다.");
        }
    }

    @Override
    public Page<Nailart> nailartList(int page, int size) {
        PageRequest pageReuest = PageRequest.of(page - 1, size, Sort.by("nailartSeq").descending());
        Page<Nailart> nailart = nailartRepository.findAll(pageReuest);
        return nailart;
    }

    @Override
    public Nailart nailartDetail(long nailartSeq) {
        // 만약 해당 작가의 다른 작품도 같이 보여주려면 여기다가 다른 객체를 생성해서 반환?
        // 아니면 각각 다른 곳에서 호춯하고 controller에서 합치기?
        return nailartRepository.findById(nailartSeq).get();
    }

//    @Override
//    public Nailart nailartRegister(NailartRegisterPostReq nailartRegisterPostReq, List<MultipartFile> multipartFiles) {
//        return null;
//    }

    @Override
    public Nailart nailartRegister(NailartRegisterPostReq nailartRegisterPostReq, List<MultipartFile> files) {

        Nailart nailart = new Nailart();
        NailartImg nailartImg = new NailartImg();
        Nailart nailartSaved = new Nailart();
        // 먼저 생성된 작품 번호를 받아와야 한다.
        // 받아온 작품 번호를 외래키로 지정.

        System.out.println("등록으로 들어왔다.");
        System.out.println(nailartRegisterPostReq);
        System.out.println(files);
        int index = 0;
        for(MultipartFile file: files) {
            System.out.println("q반복문체크");
            if(index == 0){
                System.out.println("들어온건가?");
//                System.out.println(files);
                nailart.setNailartName(nailartRegisterPostReq.getNailartName());
                nailart.setNailartDesc(nailartRegisterPostReq.getNailartDesc());
                nailart.setNailartType(nailartRegisterPostReq.getNailartType());
                nailart.setNailartColor(nailartRegisterPostReq.getNailartColor());
                nailart.setNailartDetailColor(nailartRegisterPostReq.getNailartDetailColor());
                nailart.setNailartWeather(nailartRegisterPostReq.getNailartWeather());
                nailart.setNailartPrice(nailartRegisterPostReq.getNailartPrice());
                // 이미지 업로드
                String fileName = createFileName(file.getOriginalFilename());
                ObjectMetadata objectMetadata = new ObjectMetadata();
                objectMetadata.setContentLength(file.getSize());
                objectMetadata.setContentType(file.getContentType());
                System.out.println(nailart);
                System.out.println(fileName);
                try(InputStream inputStream = file.getInputStream()) {
                    System.out.println("s3 진입");
                    s3Client.putObject(new PutObjectRequest(bucket, fileName, file.getInputStream(), null)
                            .withCannedAcl(CannedAccessControlList.PublicRead));
                    return s3Client.getUrl(bucket, fileName).toString();
//                    amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
//                            .withCannedAcl(CannedAccessControlList.PublicRead));
                    System.out.println("s3문제인듯?");
                } catch(IOException e) {
                    System.out.println("s3 진입 실패");
                    throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "이미지 업로드에 실패했습니다.");
                }
                //
                System.out.println("과연여기까지?");
                nailart.setNailartThumbnailUrl(fileName);
                nailartSaved = nailartRepository.save(nailart);
            }else{
                // 이미지 업로드
                String fileName = createFileName(file.getOriginalFilename());
                ObjectMetadata objectMetadata = new ObjectMetadata();
                objectMetadata.setContentLength(file.getSize());
                objectMetadata.setContentType(file.getContentType());
                System.out.println("두번째파일");
                try(InputStream inputStream = file.getInputStream()) {
                    System.out.println("두번째파일 s3 진입");
                    amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
                            .withCannedAcl(CannedAccessControlList.PublicRead));
                } catch(IOException e) {
                    System.out.println("두번째파일 s3 진입 실패");
                    throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "이미지 업로드에 실패했습니다.");
                }
                //
                nailartImg.setNailartSeq(nailartSaved.getNailartSeq());
                nailartImg.setNailartImgUrl(fileName);
            }
            index++;
        }
        System.out.println("여기까지안오나?");
        System.out.println(nailart);
        return nailart;
    }
//    @Override
//    public Nailart nailartRegister(NailartRegisterPostReq nailartRegisterPostReq, List<MultipartFile> multipartFiles) {
//        Nailart nailart = new Nailart();
//        NailartImg nailartImg = new NailartImg();
//        Nailart nailartSaved = new Nailart();
//        // 먼저 생성된 작품 번호를 받아와야 한다.
//        // 받아온 작품 번호를 외래키로 지정.
//
//        System.out.println("등록으로 들어왔다.");
//
//        int index = 0;
//        for(MultipartFile file: multipartFiles) {
//            if(index == 0){
//                nailart.setNailartName(nailartRegisterPostReq.getNailartName());
//                nailart.setNailartDesc(nailartRegisterPostReq.getNailartDesc());
//                nailart.setNailartType(nailartRegisterPostReq.getNailartType());
//                nailart.setNailartColor(nailartRegisterPostReq.getNailartColor());
//                nailart.setNailartDetailColor(nailartRegisterPostReq.getNailartDetailColor());
//                nailart.setNailartWeather(nailartRegisterPostReq.getNailartWeather());
//                nailart.setNailartPrice(nailartRegisterPostReq.getNailartPrice());
//                // 이미지 업로드
//                String fileName = createFileName(file.getOriginalFilename());
//                ObjectMetadata objectMetadata = new ObjectMetadata();
//                objectMetadata.setContentLength(file.getSize());
//                objectMetadata.setContentType(file.getContentType());
//
//                try(InputStream inputStream = file.getInputStream()) {
//                    amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
//                            .withCannedAcl(CannedAccessControlList.PublicRead));
//                } catch(IOException e) {
//                    throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "이미지 업로드에 실패했습니다.");
//                }
//                //
//                nailart.setNailartThumbnailUrl(fileName);
//                nailartSaved = nailartRepository.save(nailart);
//            }else{
//                // 이미지 업로드
//                String fileName = createFileName(file.getOriginalFilename());
//                ObjectMetadata objectMetadata = new ObjectMetadata();
//                objectMetadata.setContentLength(file.getSize());
//                objectMetadata.setContentType(file.getContentType());
//
//                try(InputStream inputStream = file.getInputStream()) {
//                    amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
//                            .withCannedAcl(CannedAccessControlList.PublicRead));
//                } catch(IOException e) {
//                    throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "이미지 업로드에 실패했습니다.");
//                }
//                //
//                nailartImg.setNailartSeq(nailartSaved.getNailartSeq());
//                nailartImg.setNailartImgUrl(fileName);
//            }
//            index++;
//        }
//
//        return nailart;
//    }

    @Override
    public boolean nailartRemove(long nailartSeq) {
        if (nailartRepository.findById(nailartSeq).isPresent()){
            nailartRepository.deleteById(nailartSeq);
            return true;
        } else return false;
    }


}
