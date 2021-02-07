package com.partyup.application.exception;

public class PartyUpAccessException extends RuntimeException {

    public PartyUpAccessException() {
        this(null);
    }

    public PartyUpAccessException(String exceptionMessage) {
        this(exceptionMessage, null);
    }

    public PartyUpAccessException(String exceptionMessage, Exception exception) {
        super(exceptionMessage, exception);
    }

}
