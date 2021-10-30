package com.partyup.gamesearch.game.application.service;

import com.partyup.gamesearch.game.application.dto.GameInfoDto;
import com.partyup.shared.exception.PartyUpException;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class GameApiService {

    private static final int STANDARD_QUERY_RESULT_SIZE_LIMIT = 10;

    private static final String BASE_TWITCH_API_URL = "https://id.twitch.tv/oauth2/token";
    private static final String BASE_DATASTORE_URL = "https://api.igdb.com/v4/";
    private static final String BASE_GAME_DATASTORE_URL = BASE_DATASTORE_URL + "games";
    private static final String GAME_DATASTORE_CLIENT_ID = "Client-ID";
    private static final String ALL_GAMES_DATASTORE_LOOKUP_QUERY = "fields name, summary, screenshots.*; where screenshots != null; limit %d;";
    private static final String SEARCHABLE_GAME_DATASTORE_LOOKUP_QUERY = ALL_GAMES_DATASTORE_LOOKUP_QUERY + " search \"%s\";";
    private static final String FULL_TWITCH_API_URL = BASE_TWITCH_API_URL + "?client_id=%s&client_secret=%s&grant_type=%s";
    private static final String DEFAULT_GRANT_TYPE = "client_credentials";
    private static final String ACCESS_TOKEN = "access_token";

    @Value("${oauth.client.id}")
    private String oAuthClientId;

    @Value("${oauth.client.secret}")
    private String oAuthClientSecret;

    private final RestTemplate restTemplate;

    public List<GameInfoDto> getGameList(int searchLimit) {
        HttpHeaders headers = new HttpHeaders();
        String accessToken = retrieveAccessToken();
        headers.setBearerAuth(accessToken);
        headers.set(GAME_DATASTORE_CLIENT_ID, oAuthClientId);
        return getGameInformationFromDataStore(headers, String.format(ALL_GAMES_DATASTORE_LOOKUP_QUERY, searchLimit));
    }

    public List<GameInfoDto> findGamesByQuery(String query) {
        HttpHeaders headers = new HttpHeaders();
        String accessToken = retrieveAccessToken();
        headers.setBearerAuth(accessToken);
        headers.set(GAME_DATASTORE_CLIENT_ID, oAuthClientId);
        return getGameInformationFromDataStore(headers, String.format(SEARCHABLE_GAME_DATASTORE_LOOKUP_QUERY, STANDARD_QUERY_RESULT_SIZE_LIMIT, query));
    }

    private List<GameInfoDto> getGameInformationFromDataStore(HttpHeaders headers, String lookupQueryBody) {
        HttpEntity<String> request = new HttpEntity<>(lookupQueryBody, headers);
        GameInfoDto[] gameInfoList = restTemplate.postForEntity(BASE_GAME_DATASTORE_URL, request, GameInfoDto[].class).getBody();
        if (gameInfoList == null || gameInfoList.length == 0) {
            throw new PartyUpException("Error finding game information in remote data store");
        }
       return Arrays.asList(gameInfoList);
    }

    private String retrieveAccessToken() {
        String url = String.format(FULL_TWITCH_API_URL, oAuthClientId, oAuthClientSecret, DEFAULT_GRANT_TYPE);
        ResponseEntity<Object> response = restTemplate.postForEntity(url, null, Object.class);
        return ((LinkedHashMap<String, String>) response.getBody()).get(ACCESS_TOKEN);
    }

}
