package com.nail.backend.domain.user.response;


import com.nail.backend.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value = "LoginPostRes", description = "유저 로그인 시 반환하는 정보")
public class LoginPostRes extends BaseResponseBody {
    @ApiModelProperty(name = "JWT access token")
    String accessToken;

    @ApiModelProperty(name = "유저 구분 id")
    Long userId;

    @ApiModelProperty(name = "유저 nickName")
    String userNick;



    public static LoginPostRes of(Integer statusCode, String message, String accessToken, Long userId, String userNick) {
        LoginPostRes loginRes = new LoginPostRes();
        loginRes.setStatusCode(statusCode);
        loginRes.setMessage(message);
        loginRes.setAccessToken(accessToken);
        loginRes.setUserId(userId);
        loginRes.setUserNick(userNick);
        return loginRes;
    }
}
