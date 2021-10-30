package com.partyup.usermanagement.user.application.exception;

public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(String errorMessage) {
        this(errorMessage, null);
    }

    public UserNotFoundException(String errorMessage, Throwable err) {
        super(errorMessage, err);
    }

}
