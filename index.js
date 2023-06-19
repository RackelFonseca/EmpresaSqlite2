


// Importando as bibliotecas que iremos utilizar
const { Sequelize, Model, DataTypes } = require("sequelize");
//abrindo uma conexão
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "empresa.sqlite"
});

// Definindo a classe setor
class Setor extends Model {
  static init(sequelize) {
    super.init({
      idsetor: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },

      nome: {
        type: DataTypes.STRING(60),
        allowNull: false
      },

      ramal: {
        type: DataTypes.STRING(6)
      },
      email: {
        type: DataTypes.STRING(40)
      }
    }, { sequelize, modelName: 'setor', tableName: 'setores' })
  }
}

// inicializando o modelo create table
Setor.init(sequelize);
class Funcionario extends Model {
  static init(sequelize) {
    super.init({
      matricula: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },

      Idsetor: {
        type: DataTypes.INTEGER,
        references: {
          model: Setor,
          key: 'idsetor'
        }
      },
      nome: {
        type: DataTypes.STRING(60),
        allowNull: false
      },
      nascimento: {
        type: DataTypes.DATE
      },
      telefone: {
        type: DataTypes.STRING(15)
      }
    }, { sequelize, modelName: 'funcionario', tableName: 'funcionarios' })
  }
}

// inicializando o modelo create table Setor
Funcionario.init(sequelize);
(async () => {

  // Sincronizando automaticamente
  await sequelize.sync({ force: true });
  //Create Setor
  const setor_c = await Setor.create({
    nome: "Financeiro", ramal: "2134", email:
      "financeiro@empresa.com"
  });
  const setor_S = await Setor.create({
    nome: "Secretaria", ramal: "2135", email:
      "secretaria@empresa.com"
  });
  const setor_P = await Setor.create({
    nome: "Portaria", ramal: "2136", email:
      "portaria@empresa.com"
  });
  
  //3 novos setores
  const setor_Contabilidade = await Setor.create({
    nome: "Contabilidade", ramal: "2137", email:
      "contabilidade@empresa.com"
  });
  const setor_Diretoria = await Setor.create({
    nome: "Diretoria", ramal: "2138", email:
      "diretoria@empresa.com"
  });
  const setor_Recursos_Humanos = await Setor.create({
    nome: "Recursos_Humanos", ramal: "2139", email:
      "recursos_humanos@empresa.com"
  });

  ///*
  // READ Listando objetos da tabela Setor
  const setores_listar = await Setor.findAll();
  console.log("Lista de setores: \n", JSON.stringify(setores_listar, null, 2), "\n\n");
  //})();
  //*/
  //UPDATE
  const setor_chave = await Setor.findByPk(3);//busca chave primaria
  setor_chave.nome = "Estoque";//trocar o nome

  const resultado = await setor_chave.save();
  console.log(resultado);//mostrar o resultado

  const setor_chave2 = await Setor.findByPk(6);//busca chave primaria
  setor_chave2.nome = "Departamento Pessoal";//trocar o nome

  const resultado2 = await setor_chave2.save();
  console.log(resultado2);//mostrar o resultado

  //Lista atualizada
  const setores_update = await Setor.findAll(); console.log("\nLista de setores atualizada: \n", JSON.stringify(setores_update, null, 2), "\n\n");


  // Deletando objetos 
  const setor_delete = await Setor.findByPk(1); setor_delete.destroy();
  const setor_delete1 = await Setor.findByPk(4); setor_delete1.destroy();

  //listando objetos após a exclusão do setor 1 - Financeiro 
  const setores_exclusao = await Setor.findAll();
  console.log("Lista de setores após a exclusão: \n",
    JSON.stringify(setores_exclusao, null, 2), "\n\n");


  /*//Createfuncionario
  const funcionario_create = await Funcionario.create({
    idsetor: 2,
    nome: "Ana", nascimento: "1978-04-12", telefone:
      "01219219"
  });

  const funcionario_create1 = await Funcionario.create({ idsetor: 3, nome: "Ivo", nascimento: "2000-12-01", telefone: "06924324" });

  const funcionario_create2 = await Funcionario.create({ idsetor: 2, nome: "Oto", nascimento: "1987-02-07", telefone: "07280921" });

  const funcionario_create3 = await Funcionario.create({ idsetor: 3, nome: "Carina", nascimento: "1990-09-09", telefone: "02932176" });



  // READ Listando objetos da tabela Funcionario
  const funcionarios_listar = await Funcionario.findAll();
  console.log("Lista de funcionarios: \n", JSON.stringify(funcionarios_listar, null, 2), "\n\n");

  */
})();



