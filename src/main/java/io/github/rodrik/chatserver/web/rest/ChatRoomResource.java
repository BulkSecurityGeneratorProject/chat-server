package io.github.rodrik.chatserver.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.rodrik.chatserver.domain.ChatRoom;

import io.github.rodrik.chatserver.repository.ChatRoomRepository;
import io.github.rodrik.chatserver.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ChatRoom.
 */
@RestController
@RequestMapping("/api")
public class ChatRoomResource {

    private final Logger log = LoggerFactory.getLogger(ChatRoomResource.class);

    private static final String ENTITY_NAME = "chatRoom";

    private final ChatRoomRepository chatRoomRepository;

    public ChatRoomResource(ChatRoomRepository chatRoomRepository) {
        this.chatRoomRepository = chatRoomRepository;
    }

    /**
     * POST  /chat-rooms : Create a new chatRoom.
     *
     * @param chatRoom the chatRoom to create
     * @return the ResponseEntity with status 201 (Created) and with body the new chatRoom, or with status 400 (Bad Request) if the chatRoom has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/chat-rooms")
    @Timed
    public ResponseEntity<ChatRoom> createChatRoom(@Valid @RequestBody ChatRoom chatRoom) throws URISyntaxException {
        log.debug("REST request to save ChatRoom : {}", chatRoom);
        if (chatRoom.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new chatRoom cannot already have an ID")).body(null);
        }
        ChatRoom result = chatRoomRepository.save(chatRoom);
        return ResponseEntity.created(new URI("/api/chat-rooms/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /chat-rooms : Updates an existing chatRoom.
     *
     * @param chatRoom the chatRoom to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated chatRoom,
     * or with status 400 (Bad Request) if the chatRoom is not valid,
     * or with status 500 (Internal Server Error) if the chatRoom couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/chat-rooms")
    @Timed
    public ResponseEntity<ChatRoom> updateChatRoom(@Valid @RequestBody ChatRoom chatRoom) throws URISyntaxException {
        log.debug("REST request to update ChatRoom : {}", chatRoom);
        if (chatRoom.getId() == null) {
            return createChatRoom(chatRoom);
        }
        ChatRoom result = chatRoomRepository.save(chatRoom);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, chatRoom.getId().toString()))
            .body(result);
    }

    /**
     * GET  /chat-rooms : get all the chatRooms.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of chatRooms in body
     */
    @GetMapping("/chat-rooms")
    @Timed
    public List<ChatRoom> getAllChatRooms() {
        log.debug("REST request to get all ChatRooms");
        return chatRoomRepository.findAll();
        }

    /**
     * GET  /chat-rooms/:id : get the "id" chatRoom.
     *
     * @param id the id of the chatRoom to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the chatRoom, or with status 404 (Not Found)
     */
    @GetMapping("/chat-rooms/{id}")
    @Timed
    public ResponseEntity<ChatRoom> getChatRoom(@PathVariable Long id) {
        log.debug("REST request to get ChatRoom : {}", id);
        ChatRoom chatRoom = chatRoomRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(chatRoom));
    }

    /**
     * DELETE  /chat-rooms/:id : delete the "id" chatRoom.
     *
     * @param id the id of the chatRoom to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/chat-rooms/{id}")
    @Timed
    public ResponseEntity<Void> deleteChatRoom(@PathVariable Long id) {
        log.debug("REST request to delete ChatRoom : {}", id);
        chatRoomRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
