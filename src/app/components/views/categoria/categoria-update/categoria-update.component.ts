import { CategoriaService } from "./../categoria.service";
import { Categoria } from "./../categoria.model";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-categoria-update",
  templateUrl: "./categoria-update.component.html",
  styleUrls: ["./categoria-update.component.css"],
})
export class CategoriaUpdateComponent implements OnInit {
  categoria: Categoria = {
    id: "",
    nome: "",
    descricao: "",
  };

  constructor(
    private service: CategoriaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categoria.id = this.route.snapshot.paramMap.get("id")!;
    this.findById();
  }

  findById(): void {
    this.service.findById(this.categoria.id!).subscribe((response) => {
      this.categoria.nome = response.nome;
      this.categoria.descricao = response.descricao;
    });
  }

  update(): void {
    this.service.update(this.categoria).subscribe(
      () => {
        this.router.navigate(["categorias"]);
        this.service.message("Categoria atualizada com sucesso!");
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
