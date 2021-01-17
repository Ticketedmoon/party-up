package com.partyup.application.exception;

import java.time.ZonedDateTime;
import java.util.List;
import org.springframework.http.HttpStatus;

public class ClientException {

    private String message;
    private HttpStatus httpStatus;
    private ZonedDateTime zonedDateTime;
    private List<String> subErrorList;

    public ClientException(String message, HttpStatus httpStatus, ZonedDateTime zonedDateTime) {
        this.message = message;
        this.httpStatus = httpStatus;
        this.zonedDateTime = zonedDateTime;
    }

    public ClientException(String message, HttpStatus httpStatus, ZonedDateTime zonedDateTime, List<String> subErrorList) {
        this.message = message;
        this.httpStatus = httpStatus;
        this.zonedDateTime = zonedDateTime;
        this.subErrorList = subErrorList;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    public void setHttpStatus(HttpStatus httpStatus) {
        this.httpStatus = httpStatus;
    }

    public ZonedDateTime getZonedDateTime() {
        return zonedDateTime;
    }

    public void setZonedDateTime(ZonedDateTime zonedDateTime) {
        this.zonedDateTime = zonedDateTime;
    }

    public List<String> getSubErrorList() {
        return subErrorList;
    }

    public void setSubErrorList(List<String> subErrorList) {
        this.subErrorList = subErrorList;
    }
}
