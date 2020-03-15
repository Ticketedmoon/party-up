package com.skybreak.application.exception;

public class UsernameNotValidException extends Exception {

    public UsernameNotValidException(String errorMessage) {
        this(errorMessage, null);
    }

    public UsernameNotValidException(String errorMessage, Throwable err) {
        super(errorMessage, err);
    }

}
