import { Livro } from "./../livro.model";
import { LivroService } from "./../livro.service";
import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-livro-create",
  templateUrl: "./livro-create.component.html",
  styleUrls: ["./livro-create.component.css"],
})
export class LivroCreateComponent implements OnInit {
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
  }

  create(): void {
    this.service.create(this.livro, this.id_cat).subscribe(
      () => {
        this.router.navigate([`categorias/${this.id_cat}/livros`]);
        this.service.message("Livro criado com sucesso!");
      },
      () => {
        this.router.navigate([`categorias/${this.id_cat}/livros`]);
        this.service.message(
          "Erro ao criar novo livro! Tente novamente mais tarde!"
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
