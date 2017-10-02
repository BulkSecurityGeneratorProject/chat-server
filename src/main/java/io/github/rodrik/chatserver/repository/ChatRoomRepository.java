package io.github.rodrik.chatserver.repository;

import io.github.rodrik.chatserver.domain.ChatRoom;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ChatRoom entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

}
