package com.partyup.application.controller;

import com.partyup.application.domain.dto.game.GameInfoDTO;
import com.partyup.application.exception.PartyUpException;
import com.partyup.application.service.GameApiClientService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/games")
public class GameLookupController {

    private static final String DEFAULT_GAME_LOOKUP_ERROR_MESSAGE = "Something went wrong when looking for game list information";

    private final GameApiClientService gameApiClientService;

    @GetMapping("/find/all/{limit}")
    public List<GameInfoDTO> findGamesWithLimit(@PathVariable int limit) {
        try {
            return gameApiClientService.getGameList(limit);
        } catch (PartyUpException e) {
            throw e;
        } catch (Exception e) {
            throw new PartyUpException(DEFAULT_GAME_LOOKUP_ERROR_MESSAGE, e);
        }
    }

    @GetMapping("/find/{query}")
    public List<GameInfoDTO> findGamesByQuery(@PathVariable String query) {
        try {
            return gameApiClientService.findGamesByQuery(query);
        } catch (PartyUpException e) {
            throw e;
        } catch (Exception e) {
            throw new PartyUpException(DEFAULT_GAME_LOOKUP_ERROR_MESSAGE, e);
        }
    }

}
