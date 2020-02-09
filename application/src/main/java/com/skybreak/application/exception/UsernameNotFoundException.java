package com.skybreak.application.exception;

public class UsernameNotFoundException extends Exception {

    public UsernameNotFoundException(String errorMessage) {
        super(errorMessage);
    }

    public UsernameNotFoundException(String errorMessage, Throwable err) {
        super(errorMessage, err);
    }

}
