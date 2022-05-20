package com.nail.backend.domain.qna.db.repository;

import com.nail.backend.domain.qna.db.entity.QnaAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QnaAnswerRepository extends JpaRepository<QnaAnswer,Long> {
    QnaAnswer findQnaAnswerByQnaSeq(Long qnaSeq);

}
