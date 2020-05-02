package com.codewars.application.exception;

public class CodeWarsException extends RuntimeException {

    public CodeWarsException() {
        this(null);
    }

    public CodeWarsException(String exceptionMessage) {
        this(exceptionMessage, null);
    }

    public CodeWarsException(String exceptionMessage, Exception exception) {
        super(exceptionMessage, exception);
    }

}
