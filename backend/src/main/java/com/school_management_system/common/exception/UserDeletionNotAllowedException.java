package com.school_management_system.common.exception;

public class UserDeletionNotAllowedException extends RuntimeException {

    public UserDeletionNotAllowedException(String message) {
        super(message);
    }
}