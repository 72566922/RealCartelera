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


@CrossOrigin(origins = "http://18.228.4.97:3000")
@Controller
public class HomeController {

    @Autowired
    private PayPalService payPalService;

    @GetMapping("/")
    public String getHomePage() {
        return "forward:/build/index.html";
    }

    @GetMapping({ "/pelicula","/dulceria","/login","/boleteria", "/register" })
    public String getInicioPage() {
        return "forward:/build/index.html";
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
                    "http://18.228.4.97:8080/cancel", "http://18.228.4.97:8080/success");
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
