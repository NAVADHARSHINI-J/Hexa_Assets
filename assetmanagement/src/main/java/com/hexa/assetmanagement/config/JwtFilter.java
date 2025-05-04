package com.hexa.assetmanagement.config;

import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import com.hexa.assetmanagement.service.MyService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
 
/*
* This class will override a method that will act as Filter.
*
* OncePerRequestFilter; Every time a request for an API comes IN, Spring must
* make it go thru this filter  
* */
@Component
public class JwtFilter extends OncePerRequestFilter{
 
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private MyService myUserService ;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request,
			HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		 try {
		/*
		 * using request, i will take token from spring
		 * using jwtUtil, i vl decode that token: username
		 * using userSecurityService, i will fetch user details by username
		 * role..
		 * */
<<<<<<< HEAD
<<<<<<< HEAD
         final String authorizationHeader = request.getHeader("Authorization");
		//final String authorizationHeader = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJTaGVyeWwiLCJleHAiOjE3NDU5NDY2NTAsImlhdCI6MTc0NTg2MDI1MH0.8F9zm3IkEbSUqBZwZVf7lwSY9SkJJahHRCbzsiFFLgc";
		System.out.println("authorization header"+authorizationHeader);
=======
//		final String authorizationHeader = request.getHeader("Authorization");
		final String authorizationHeader = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbGllbiIsImV4cCI6MTc0NjM0NDExOSwiaWF0IjoxNzQ2MjU3NzE5fQ.L2Ms8EAx3FTpSH-oi3yu8wDD5qo1Orv7NszyYxt4OBY";
		
>>>>>>> 352c588786706697ddb2acd89f08faa5afdca60a
=======
//		final String authorizationHeader = request.getHeader("Authorization");
		final String authorizationHeader = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbGllbiIsImV4cCI6MTc0NjM0NDExOSwiaWF0IjoxNzQ2MjU3NzE5fQ.L2Ms8EAx3FTpSH-oi3yu8wDD5qo1Orv7NszyYxt4OBY
      
>>>>>>> 36b5ffad85cf33920b41c3ea012aeada7fcf5cf8
		 String username = null;
	     String jwt = null;
 
	        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer")) {
	            jwt = authorizationHeader.substring(7);
	            username = jwtUtil.extractUsername(jwt);
	        }
	        
	        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
 
	            UserDetails userDetails = this.myUserService.loadUserByUsername(username);
 
	            if (jwtUtil.validateToken(jwt, userDetails.getUsername())) {
 
	                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
	                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	                usernamePasswordAuthenticationToken
	                        .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
	                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
	            }
	            
	        }
	        filterChain.doFilter(request, response);
		 }
		 catch(Exception e) {
			 System.out.println(e.getMessage());
			 //define global exception handler... todo
		 }
	}
 
}