import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@shad"

type FaqItemData = {
  question: JSX.Element
  answer: JSX.Element
}

const faqItems: FaqItemData[] = [
  {
    question: <>Como posso alterar minha foto de perfil?</>,
    answer: (
      <>
        A imagem de perfil é administrada pelo serviço de
        autenticação que estamos utilizando, com o objetivo
        de simplificar o desenvolvimento do site, pelo menos
        pelo momento. Você pode alterá-la clicando em seu
        avatar no canto superior direito e, depois, em{" "}
        <em>Gerenciar conta</em>. No menu que aparecer é só
        clicar em <em>Atualizar perfil</em> que um botão
        para alterar a foto aparecerá.
      </>
    ),
  },
  {
    question: (
      <>
        O mapa do Brasil com o número de jogadores por
        estado conta até mesmo quem lista mais de um estado
        de residência?
      </>
    ),
    answer: (
      <>
        No momento, não exatamente. Os números totais
        mostrados naquele mapa são baseados no{" "}
        <em>primeiro</em> estado listado como residência.
      </>
    ),
  },
  {
    question: (
      <span>
        O ordenamento de força é feito com qual força
        declarada?
      </span>
    ),
    answer: (
      <>
        Com a mesma força que foi escolhida pelo jogador em
        seu perfil, isto é, a primeira listada. Esta é a
        força utilizada para se calcular o seu número{" "}
        <a href="https://pt.wikipedia.org/wiki/Rating_Elo">
          elo
        </a>
        , que é então normalizado tomando-se como referência
        o KGS. A função que cuida da normalização pode ser
        examinada{" "}
        <a href="https://github.com/psygo/abragodb/blob/9b70a6b3b794b3a55cb491508b7ba5ffed0bbf16/src/types/go_server.ts#L59-L81">
          aqui
        </a>
        .
      </>
    ),
  },
]

type FaqItemProps = FaqItemData & {
  n: number
}

function FaqItem({ n, question, answer }: FaqItemProps) {
  return (
    <AccordionItem value={`item-${n}`}>
      <AccordionTrigger className="text-left text-lg">
        <ol start={n} className="py-0 my-0">
          <li>{question}</li>
        </ol>
      </AccordionTrigger>
      <AccordionContent className="text-md pl-[9px]">
        {answer}
      </AccordionContent>
    </AccordionItem>
  )
}

export function FaqList() {
  return (
    <Accordion type="single" collapsible>
      {faqItems.map((faqItem, i) => (
        <FaqItem
          key={i}
          n={i + 1}
          question={faqItem.question}
          answer={faqItem.answer}
        />
      ))}
    </Accordion>
  )
}
