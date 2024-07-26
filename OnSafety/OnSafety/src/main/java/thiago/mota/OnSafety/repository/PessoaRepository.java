package thiago.mota.onsafety.repository;

import thiago.mota.OnSafety.entity.Pessoa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PessoaRepository extends JpaRepository<Pessoa, Long> {
}
