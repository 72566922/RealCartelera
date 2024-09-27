// controller/HomeController.java
package com.proyect.real_cartelera.back_end.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import com.proyect.real_cartelera.back_end.service.PayPalService;


@CrossOrigin(origins = "http://localhost:3000")
@Controller
public class HomeController {

    @Autowired
    private PayPalService payPalService;

    @GetMapping({ "/", "/home" })
    public String getHomePage() {
        return "home";
    }

    @GetMapping({ "/inicio" })
    public String getInicioPage() {
        return "inicio";
    }

    @GetMapping({ "/aea" })
    public String getAeaPage() {
        return "aea";
    }

    @GetMapping("/success")
    public String successPayment(@RequestParam("paymentId") String paymentId,
                                  @RequestParam("PayerID") String payerId) {
        try {
            Payment payment = payPalService.executePayment(paymentId, payerId);
            if (payment.getState().equals("approved")) {
                return "success";
            }
        } catch (PayPalRESTException e) {
            e.printStackTrace(); // Consider logging the error
        }
        return "redirect:/"; // Consider adding an error message
    }

    @PostMapping("/pay")
    public String payment(@RequestParam("sum") double sum) {
        try {
            Payment payment = payPalService.createPayment(
                    sum, "USD", "paypal",
                    "sale", "Payment description",
                    "http://localhost:8080/cancel", "http://localhost:8080/success");
            for (Links link : payment.getLinks()) {
                if (link.getRel().equals("approval_url")) {
                    return "redirect:" + link.getHref();
                }
            }
        } catch (PayPalRESTException e) {
            e.printStackTrace(); // Consider logging the error
        }
        return "redirect:/"; // Consider adding an error message
    }
}
