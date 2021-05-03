package com.partyup.application.controller;

import com.partyup.application.domain.entity.Game;
import com.partyup.application.exception.PartyUpException;
import com.partyup.application.service.GameApiClientService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/games")
public class GameLookupController {

    private static final String DEFAULT_GAME_LOOKUP_ERROR_MESSAGE = "Something went wrong when looking for game list information";

    private final GameApiClientService gameApiClientService;

    @GetMapping("/findAll")
    public List<Game> findAllGames() {
        try {
            return gameApiClientService.getGameList();
        } catch (PartyUpException e) {
            throw e;
        } catch (Exception e) {
            throw new PartyUpException(DEFAULT_GAME_LOOKUP_ERROR_MESSAGE, e);
        }
    }

}
