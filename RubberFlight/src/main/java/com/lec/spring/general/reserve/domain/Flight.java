package com.lec.spring.general.reserve.domain;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;

import java.text.NumberFormat;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.UUID;


@Data
public class Flight {
    String id;
    String depAirport;  // 코드
    String depAirportName;  // 이름
    String arrAirport;
    String arrAirportName;
    String airlineIata;
    String depTime;
    String arrTime;
    int takeTime;
    int price;
    String airlineName;
    String depTimezone;
    String arrTimezone;
    String takeTimeFormat;
    String priceFormat;
    String depDayFormat;
    String arrDayFormat;

    String depTerminal;
    String depGate;
    String arrTerminal;
    String arrGate;

    LocalDateTime depSch;
    LocalDateTime arrSch;

    LocalDateTime depTimeUTC;
    LocalDateTime arrTimeUTC;

    String flightIata;

    private static final DateTimeFormatter TIME_FORMATTER = DateTimeFormatter.ofPattern("HH:mm");
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public Flight() {
    }

    public Flight(JsonNode jsonNode, String iataCode, String arrIataCode, String date, int price, String depTimezone, String arrTimezone, String depAirportName, String arrAirportName) {
        this.id = generateId();
        this.depAirport = iataCode;
        this.arrAirport = arrIataCode;
        this.depTimezone = depTimezone;
        this.arrTimezone = arrTimezone;
        this.depAirportName = depAirportName;
        this.arrAirportName = arrAirportName;

        this.airlineIata = jsonNode.path("airline").path("iataCode").asText(null);
        this.airlineName = jsonNode.path("airline").path("name").asText(null);

        this.depTerminal = jsonNode.path("departure").path("terminal").asText(null);
        this.depGate = jsonNode.path("departure").path("gate").asText(null);
        this.arrTerminal = jsonNode.path("arrival").path("terminal").asText(null);
        this.arrGate = jsonNode.path("arrival").path("gate").asText(null);
        this.flightIata = jsonNode.path("flight").path("iataNumber").asText(null);

        // JSON에서 시간 정보 가져오기
        String depTimeStr = jsonNode.path("departure").path("scheduledTime").asText(null); // "HH:mm"
        String arrTimeStr = jsonNode.path("arrival").path("scheduledTime").asText(null); // "HH:mm"


        LocalDateTime depTime = LocalDateTime.parse(date + "T" + depTimeStr + ":00");
        LocalDateTime arrTime = LocalDateTime.parse(date + "T" + arrTimeStr + ":00");

        if (arrTime.isBefore(depTime)) {
            arrTime = arrTime.plusDays(1);
        }

        this.depSch = depTime;
        this.arrSch = arrTime;

        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");

        System.out.println("예상 출발 시간" + depTime);
        System.out.println("예상 도착 시간" + arrTime);

        DateTimeFormatter dayFormatter = DateTimeFormatter.ofPattern("yyyy.MM.dd");

        String formattedDepDate = depTime.format(dayFormatter);
        DayOfWeek depDayOfWeek = depTime.getDayOfWeek();
        String depDayOfWeekStr = depDayOfWeek.getDisplayName(java.time.format.TextStyle.SHORT, java.util.Locale.KOREAN);

        this.depDayFormat = String.format("%s(%s)", formattedDepDate, depDayOfWeekStr);

        String formattedArrDate = arrTime.format(dayFormatter);
        DayOfWeek arrDayOfWeek = arrTime.getDayOfWeek();
        String arrDayOfWeekStr =  arrDayOfWeek.getDisplayName(java.time.format.TextStyle.SHORT, java.util.Locale.KOREAN);

        this.arrDayFormat = String.format("%s(%s)", formattedArrDate, arrDayOfWeekStr);

        this.depTime = depTime.format(timeFormatter);
        this.arrTime = arrTime.format(timeFormatter);

        this.depTimeUTC = convertToUTC(depTime, depTimezone);
        this.arrTimeUTC = convertToUTC(arrTime, arrTimezone);

        Duration duration = Duration.between(depTimeUTC, arrTimeUTC);
        this.takeTime = (int) duration.toMinutes();

        System.out.println("UTC 기준 출발 시간" + depTimeUTC);
        System.out.println("UTC 기준 도착 시간" + arrTimeUTC);

        this.takeTimeFormat = convertMinutesToHoursAndMinutes(this.takeTime);

//        this.price = price;
        this.price = 100;
        this.priceFormat = getFormattedPrice(this.price);
    }

    private String getFormattedPrice(int price) {
        NumberFormat format = NumberFormat.getNumberInstance();
        return format.format(price);
    }

    private String convertMinutesToHoursAndMinutes(int takeTime) {
        int hours = takeTime / 60;
        int remainingMinutes = takeTime % 60;
        return String.format("%d시간 %d분", hours, remainingMinutes);
    }


    private LocalDateTime convertToUTC(LocalDateTime time, String timezone) {
        ZoneId zoneId = ZoneId.of(timezone);
        ZonedDateTime zonedDateTime = time.atZone(zoneId);
        ZonedDateTime utcDateTime = zonedDateTime.withZoneSameInstant(ZoneId.of("UTC"));
        return utcDateTime.toLocalDateTime();
    }

    private String generateId() {
        return UUID.randomUUID().toString(); // UUID를 사용하여 고유 식별자를 생성
    }
}