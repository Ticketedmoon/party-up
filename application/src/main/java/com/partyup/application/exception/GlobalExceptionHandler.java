package com.partyup.application.exception;

import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(PartyUpAccessException.class)
    protected ResponseEntity<?> handlePartyUpAccessException(final PartyUpAccessException exception) {
        final HttpStatus badRequestStatus = HttpStatus.BAD_REQUEST;
        ClientException clientException = new ClientException(
                exception.getMessage(),
                badRequestStatus,
                ZonedDateTime.now(ZoneOffset.UTC));
        return new ResponseEntity<>(clientException, badRequestStatus);
    }

}
