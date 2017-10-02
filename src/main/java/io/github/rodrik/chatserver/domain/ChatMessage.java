package io.github.rodrik.chatserver.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A ChatMessage.
 */
@Entity
@Table(name = "chat_message")
public class ChatMessage implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "message")
    private String message;

    @ManyToOne
    private ChatSession chatSession;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public ChatMessage message(String message) {
        this.message = message;
        return this;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public ChatSession getChatSession() {
        return chatSession;
    }

    public ChatMessage chatSession(ChatSession chatSession) {
        this.chatSession = chatSession;
        return this;
    }

    public void setChatSession(ChatSession chatSession) {
        this.chatSession = chatSession;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ChatMessage chatMessage = (ChatMessage) o;
        if (chatMessage.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), chatMessage.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ChatMessage{" +
            "id=" + getId() +
            ", message='" + getMessage() + "'" +
            "}";
    }
}
