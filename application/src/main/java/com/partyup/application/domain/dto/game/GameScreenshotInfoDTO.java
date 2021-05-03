package com.partyup.application.domain.dto.game;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GameScreenshotInfoDTO {
    private Integer id;
    private Integer game;
    private String url;
}
