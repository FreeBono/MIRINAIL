package com.nail.backend.domain.designer.db.entitiy;

import lombok.*;

import javax.persistence.Column;
import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DesignerInfoId implements Serializable {

    Long userSeq;
}