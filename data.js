const jsonfile = require('jsonfile-promised');
const fs = require('fs');

module.exports = {
  salvaDados(curso,tempoEstudado){
    let arquivoDoCurso = __dirname + '/data/'+ curso + '.json';
    if (fs.existsSync(arquivoDoCurso)) {
      //Salvar
      this.adicionaTempoAoCurso(arquivoDoCurso,tempoEstudado);
    } else {
      this.criaArquivodeCurso(arquivoDoCurso,{})
        .then(() => {
        //Salvar Dados
        this.adicionaTempoAoCurso(arquivoDoCurso,tempoEstudado);
      })
    }
  },
  adicionaTempoAoCurso(arquivoDoCurso,tempoEstudado){
    let dados ={
      ultimoEstudo: new Date().toString(),
      tempo: tempoEstudado
    }
      jsonfile.writeFile(arquivoDoCurso,dados,{spaces: 2})
          .then(() => {
            console.log('Tempo salvo com sucesso');
          }).catch((error) => {
            console.log(error);
          })
  },
  criaArquivodeCurso(nomeArquivo,conteudoArquivo){
      return jsonfile.writeFile(nomeArquivo,conteudoArquivo)
        .then(() => {
          console.log('Arquivo Criado');
        }).catch((error) => {
          console.log(error);
        });
  },
  pegaDados(curso){
    let arquivoDoCurso = __dirname + '/data/'+ curso + '.json';
      return jsonfile.readFile(arquivoDoCurso);
  },
  pegaNomeDosCursos(){
    let arquivos = fs.readdirSync(__dirname + '/data/');
    let cursos = arquivos.map((arquivo) => {
      return arquivo.substr(0, arquivo.lastIndexOf('.'));
    });

    return cursos;
  }


}
