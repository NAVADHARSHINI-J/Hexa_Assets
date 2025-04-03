package com.hexa.assetmanagement.config;

import org.springframework.http.HttpStatusCode;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.hexa.assetmanagement.exception.InvalidContactException;
import com.hexa.assetmanagement.exception.InvalidIdException;

@RestControllerAdvice
public class GlobalExceptionHandler {
	@ExceptionHandler(InvalidIdException.class)
	public ErrorResponse idInvalidErrorHandler(InvalidIdException e) {
		return ErrorResponse.create(e, HttpStatusCode.valueOf(400), e.getMessage());
	}
	
	@ExceptionHandler(InvalidContactException.class)
	public ErrorResponse contactErrorHandler(InvalidContactException e) {
		return ErrorResponse.create(e, HttpStatusCode.valueOf(400), e.getMessage());
	}
}
