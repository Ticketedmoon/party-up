package com.skybreak.application.exception;

public class IncorrectPasswordException extends RuntimeException {

    public IncorrectPasswordException(String errorMessage) {
        this(errorMessage, null);
    }

    public IncorrectPasswordException(String errorMessage, Throwable err) {
        super(errorMessage, err);
    }

}
