import { Categoria } from "./../categoria.model";
import { CategoriaService } from "./../categoria.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-categoria-create",
  templateUrl: "./categoria-create.component.html",
  styleUrls: ["./categoria-create.component.css"],
})
export class CategoriaCreateComponent implements OnInit {
  categoria: Categoria = {
    nome: "",
    descricao: "",
  };

  constructor(private service: CategoriaService, private router: Router) {}

  ngOnInit(): void {}

  create(): void {
    this.service.create(this.categoria).subscribe(
      () => {
        this.service.message("Categoria criada com sucesso!");
        this.router.navigate(["categorias"]);
      },
      (err) => {
        for (let i = 0; i < err.error.errors.length; i++) {
          this.service.message(err.error.errors[i].message);
        }
      }
    );
  }

  cancel(): void {
    this.router.navigate(["categorias"]);
  }
}
