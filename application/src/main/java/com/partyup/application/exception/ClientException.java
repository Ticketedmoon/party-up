package com.partyup.application.exception;

import java.time.ZonedDateTime;
import java.util.Collections;
import java.util.List;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@RequiredArgsConstructor
public class ClientException {

    private final String message;
    private final HttpStatus httpStatus;
    private final ZonedDateTime zonedDateTime;
    private final List<String> subErrorList;

    public ClientException(String message, HttpStatus httpStatus, ZonedDateTime zonedDateTime) {
        this.message = message;
        this.httpStatus = httpStatus;
        this.zonedDateTime = zonedDateTime;
        this.subErrorList = Collections.emptyList();
    }

}
