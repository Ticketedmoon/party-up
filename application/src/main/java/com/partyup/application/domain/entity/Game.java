package com.partyup.application.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Game {
    private Integer id;
    private String name;
    private Integer screenshotID;
    private String screenshotUrl;
    private String summary;
}
