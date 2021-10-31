package com.partyup.gamesearch.game.application.service;

import com.partyup.gamesearch.game.application.dto.GameResponse;
import com.partyup.shared.exception.PartyUpException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class GameApiService {

    private static final String BASE_DATASTORE_URL = "https://www.giantbomb.com/api";
    private static final String BASE_DATASTORE_ALL_GAMES_LOOKUP_URL = BASE_DATASTORE_URL + "/games/?api_key=%s&format=json&field_list=name,image,guid&limit=%d";
    private static final String BASE_DATASTORE_GAME_SEARCH_LOOKUP_URL = BASE_DATASTORE_URL + "/search/?api_key=%s&format=json&field_list=name,image&query=%s&resources=game";
    // TODO: This will be unused until data migrated to DB.
    private static final String BASE_DATASTORE_SINGLE_GAME_LOOKUP_URL = "https://www.giantbomb.com/api/game/%s/?api_key=%s&format=json&field_list=name,description,image";

    @Value("${GAME_LOOKUP_KEY}")
    private String gameLookupKey;

    private final RestTemplate restTemplate;

    public List<GameResponse.GameResult> getGameList(int searchLimit) {
        return getGameInformationFromDataStore(String.format(BASE_DATASTORE_ALL_GAMES_LOOKUP_URL, gameLookupKey, searchLimit));
    }

    public List<GameResponse.GameResult> findGamesByQuery(String gameName) {
        return getGameInformationFromDataStore(String.format(BASE_DATASTORE_GAME_SEARCH_LOOKUP_URL, gameLookupKey, gameName));
    }

    private List<GameResponse.GameResult> getGameInformationFromDataStore(String requestUrl) {
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.add("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36");
        HttpEntity<String> entity = new HttpEntity<>("parameters", headers);
        GameResponse responseBody = restTemplate.exchange(requestUrl, HttpMethod.GET, entity, GameResponse.class).getBody();
        if (responseBody == null || responseBody.getResults().length == 0) {
            throw new PartyUpException("Error finding game information in remote data store");
        }
        return Arrays.asList(responseBody.getResults());
    }

}
