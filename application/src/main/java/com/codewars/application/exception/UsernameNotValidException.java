package com.codewars.application.exception;

public class UsernameNotValidException extends RuntimeException {

    public UsernameNotValidException(String errorMessage) {
        this(errorMessage, null);
    }

    public UsernameNotValidException(String errorMessage, Throwable err) {
        super(errorMessage, err);
    }

}
