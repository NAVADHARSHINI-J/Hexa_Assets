package com.hexa.assetmanagement.config;

import org.springframework.http.HttpStatusCode;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.hexa.assetmanagement.exception.AssetUnavailableException;
import com.hexa.assetmanagement.exception.InvalidContactException;
import com.hexa.assetmanagement.exception.InvalidIdException;
import com.hexa.assetmanagement.exception.UsernameInvalidException;

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
	
	@ExceptionHandler(UsernameInvalidException.class)
	public ErrorResponse usernameErrorHandler(UsernameInvalidException e) {
		return ErrorResponse.create(e, HttpStatusCode.valueOf(400), e.getMessage());
	}
	@ExceptionHandler(Exception.class)
	public ErrorResponse ErrorHandler(Exception e) {
		return ErrorResponse.create(e, HttpStatusCode.valueOf(400), e.getMessage());
	}
	@ExceptionHandler(AssetUnavailableException.class)
	public ErrorResponse AssetUnavailableExceptionHandler(AssetUnavailableException e) {
		return ErrorResponse.create(e, HttpStatusCode.valueOf(400), e.getMessage());
	}
	
}
