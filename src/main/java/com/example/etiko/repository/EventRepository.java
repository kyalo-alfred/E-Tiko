package com.example.etiko.repository;

import com.example.etiko.model.Event;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, String> {
    @Query("select e from Event e where (:q is null or lower(e.title) like lower(concat('%', :q, '%'))) and e.status = 'PUBLISHED'")
    List<Event> searchPublished(@Param("q") String q);
}
