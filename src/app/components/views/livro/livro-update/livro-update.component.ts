import { LivroService } from "./../livro.service";
import { Validators } from "@angular/forms";
import { Livro } from "./../livro.model";
import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-livro-update",
  templateUrl: "./livro-update.component.html",
  styleUrls: ["./livro-update.component.css"],
})
export class LivroUpdateComponent implements OnInit {
  id_cat: String = "";

  titulo = new FormControl("", [Validators.minLength(3)]);
  nomeAutor = new FormControl("", [Validators.minLength(3)]);
  texto = new FormControl("", [Validators.minLength(10)]);

  livro: Livro = {
    id: "",
    titulo: "",
    nomeAutor: "",
    texto: "",
  };

  constructor(
    private service: LivroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get("id_cat")!;
    this.livro.id = this.route.snapshot.paramMap.get("id")!;
    this.findById();
  }

  findById(): void {
    this.service.findById(this.livro.id!).subscribe((response) => {
      this.livro = response;
    });
  }

  update(): void {
    this.service.update(this.livro).subscribe(
      () => {
        this.router.navigate([`categorias/${this.id_cat}/livros`]);
        this.service.message("Livro atualizado com sucesso!");
      },
      () => {
        this.router.navigate([`categorias/${this.id_cat}/livros`]);
        this.service.message(
          "Falha ao atualizar livro! Tente novamente mais tarde!"
        );
      }
    );
  }

  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }

  getTitleValidation() {
    if (this.titulo.invalid) {
      return "O campo TÍTULO deve conter entre 3 e 100 caracteres!";
    }
    return false;
  }

  getNameValidation() {
    if (this.nomeAutor.invalid) {
      return "O campo NOME DO AUTOR deve conter entre 3 e 100 caracteres!";
    }
    return false;
  }

  getTextValidation() {
    if (this.texto.invalid) {
      return "O campo TEXTO deve conter entre 10 e 2.000.000 caracteres!";
    }
    return false;
  }
}
