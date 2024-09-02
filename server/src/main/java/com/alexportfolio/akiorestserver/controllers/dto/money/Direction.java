package com.alexportfolio.akiorestserver.controllers.dto.money;

import lombok.*;

@EqualsAndHashCode
public class Direction{
    String source;
    String dest;

    public Direction() {
    }

    public Direction(String source, String dest) {
        this.source = source;
        this.dest = dest;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getDest() {
        return dest;
    }

    public void setDest(String dest) {
        this.dest = dest;
    }

    @Override
    public String toString() {
        return "Direction{" +
                "source='" + source + '\'' +
                ", dest='" + dest + '\'' +
                '}';
    }
}