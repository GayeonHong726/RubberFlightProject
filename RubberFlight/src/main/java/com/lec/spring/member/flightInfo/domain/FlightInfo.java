package com.lec.spring.member.flightInfo.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.lec.spring.general.reserve.domain.Reserve;
import com.lec.spring.member.review.domain.Review;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "ft_flightinfo")
public class FlightInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "reservation_id", nullable = false)
    private Reserve reserve;

    @Column(nullable = false, name = "dep_airport")
    private String depAirport;

    @Column(nullable = false, name = "dep_iata")
    private String depIata;

    @Column(nullable = false, name = "arr_airport")
    private String arrAirport;

    @Column(nullable = false, name = "arr_iata")
    private String arrIata;

    @Column(nullable = false)
    private int price;

    @Column(nullable = false, name = "flight_iat")
    private String flightIat;

    @Column(nullable = false, name = "dep_sch")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime depSch;

    @Column(nullable = false, name = "arr_sch")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime arrSch;

    @Column(nullable = false, name = "airline_name")
    private String airlineName;

    @OneToOne
    @JoinColumn(name = "review_id")
    private Review review;
}
