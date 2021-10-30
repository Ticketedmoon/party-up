package com.partyup.shared.exception;

public class PartyUpException extends RuntimeException {

    public PartyUpException() {
        this(null);
    }

    public PartyUpException(String exceptionMessage) {
        this(exceptionMessage, null);
    }

    public PartyUpException(String exceptionMessage, Exception exception) {
        super(exceptionMessage, exception);
    }

}
