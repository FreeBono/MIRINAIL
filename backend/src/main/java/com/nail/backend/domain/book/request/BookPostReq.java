package com.nail.backend.domain.book.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@ApiModel(value = "BookPostReq", description = "예약 등록시 필요한 정보")
public class BookPostReq {
    // 유저 번호
    @ApiModelProperty(value = "유저 번호", example = "1")
    Long userSeq;

    // 디자이너 번호
    @ApiModelProperty(value = "디자이너의 유저 번호", example = "1")
    Long designerSeq;

    // 작품 번호
    @ApiModelProperty(value = "네일아트 번호", example = "1")
    Long nailartSeq;

    // 예약 날짜 및 시간
    @ApiModelProperty(value = "예약 날짜 및 시간", example = "어떤 타입으로 넘어올지 모르겠음.")
    LocalDateTime bookDatetime;

    // 예약 코멘트
    @ApiModelProperty(value = "예약 코멘트", example = "상담후에 시술 결정하고 싶어요.")
    String bookComment;
}