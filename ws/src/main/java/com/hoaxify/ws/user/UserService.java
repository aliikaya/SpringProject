package com.hoaxify.ws.user;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.MailException;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hoaxify.ws.configuration.CurrentUser;
import com.hoaxify.ws.email.EmailService;
import com.hoaxify.ws.file.FileService;
import com.hoaxify.ws.user.dto.UserUpdate;
import com.hoaxify.ws.user.exception.ActivationNotificationException;
import com.hoaxify.ws.user.exception.InvalidTokenException;
import com.hoaxify.ws.user.exception.NotFoundException;
import com.hoaxify.ws.user.exception.NotUniqueEmailException;

import jakarta.transaction.Transactional;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    EmailService emailService;

    @Autowired    
    PasswordEncoder passwordEncoder;

    @Autowired
    FileService fileService;

    @Transactional(rollbackOn = MailException.class)
    public void save(User user) {
        try {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setActivationToken(UUID.randomUUID().toString());
            userRepository.saveAndFlush(user);
            emailService.sendActivationEmail(user.getEmail(), user.getActivationToken());
        } catch (DataIntegrityViolationException ex) {
            throw new NotUniqueEmailException();
        }catch(MailException ex){
            throw new ActivationNotificationException();
        }

    }

    public void avtivateUser(String token) {
       User inDB = userRepository.findByActivationToken(token);
       if(inDB == null){
        throw new InvalidTokenException();
       }
       inDB.setActive(true);
       inDB.setActivationToken(null);
       userRepository.save(inDB);
    }

    public Page<User> getUsers(Pageable pageable, CurrentUser currentUser) {
        if(currentUser == null){
            return userRepository.findAll(pageable);
        }
        return userRepository.findByIdNot(currentUser.getId(), pageable);

    }

    public User getUser(long id) {
        return userRepository.findById(id).orElseThrow(() -> new NotFoundException(id));
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User updateUser(long id, UserUpdate userUpdate) {
        User inDB = getUser(id);
        inDB.setUsername(userUpdate.username());
        if(userUpdate.image() != null){
            String fileName = fileService.saveBase64StringAsFile(userUpdate.image());
            fileService.deleteProfileImage(inDB.getImage());
            inDB.setImage(fileName);
        }
        
        return userRepository.save(inDB);
    }

    public void deleteUser(long id) {
        User inDB = getUser(id);
        if(inDB.getImage() != null){
            fileService.deleteProfileImage(inDB.getImage());
        }
        userRepository.delete(inDB);
    }

    

    

}
