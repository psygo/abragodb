import { FaqList } from "@components"

export default function AboutPage() {
  return (
    <article className="prose dark:prose-invert px-2">
      <section>
        <h2 className="mt-6">Sobre o Projeto</h2>

        <p>
          O ABRAGO DB é um banco de dados interativo para
          jogadores brasileiros. Como uma segunda etapa do
          projeto, há intenções de se adicionar partidas e
          rankings.
        </p>

        <p>
          O site é todo desenvolvido em código aberto, e
          você pode contribuir com código ou sugestões
          através de{" "}
          <a href="https://github.com/psygo/abragodb">
            github.com/psygo/abragodb
          </a>
          . O canal{" "}
          <a href="https://discord.gg/7u6MVMFEfv">
            #abrago-db no Discord
          </a>{" "}
          também está aberto para quem quiser participar na
          construção do site.
        </p>

        <p>
          Algumas das funcionalidades que estão planejadas:
        </p>

        <ul>
          <li>Histograma da População de Jogadores</li>
          <li>Internacionalização</li>
          <li>Partidas</li>
          <li>Torneios</li>
        </ul>
      </section>

      <section>
        <h2>Perguntas Frequentes</h2>
        <FaqList />
      </section>
    </article>
  )
}
