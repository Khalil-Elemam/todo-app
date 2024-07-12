package com.killuacode.Todoapi.email;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;


    @Async
    public void sendVerificationEmail(
            String from,
            String to,
            String name,
            String activationLink
    ) throws MessagingException {

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(message, "utf-8");
        messageHelper.setPriority(1);
        messageHelper.setSubject("Email Verification");
        messageHelper.setFrom(from);
        messageHelper.setTo(to);
        Context context = new Context();
        context.setVariables(Map.of(
                "name",
                name,
                "activationLink",
                activationLink
        ));
        String template = templateEngine.process("activation-email", context);
        messageHelper.setText(template, true);
        mailSender.send(message);
    }

}
