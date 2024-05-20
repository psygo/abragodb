import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/common/shad/accordion"

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
          <li>Estatísticas da População de Jogadores</li>
          <li>Mapa Interativo com os Jogadores</li>
          <li>Internacionalização</li>
          <li>Partidas</li>
          <li>Torneios</li>
        </ul>
      </section>
      <section>
        <h2>Perguntas Frequentes</h2>

        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left text-lg">
              <ol className="py-0 my-0">
                <li>
                  O mapa do Brasil com o número de jogadores
                  por estado conta até mesmo quem lista mais
                  de um estado de residência?
                </li>
              </ol>
            </AccordionTrigger>
            <AccordionContent className="text-md pl-[9px]">
              No momento, não exatamente. Os números totais
              mostrados naquele mapa são baseados no{" "}
              <em>primeiro</em> estado listado como
              residência.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left text-lg">
              <ol start={2} className="py-0 my-0">
                <li>
                  O ordenamento de força é feito com qual
                  força declarada?
                </li>
              </ol>
            </AccordionTrigger>
            <AccordionContent className="text-md pl-[9px]">
              Com a mesma força que foi escolhida pelo
              jogador em seu perfil, isto é, a primeira
              listada.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </article>
  )
}
