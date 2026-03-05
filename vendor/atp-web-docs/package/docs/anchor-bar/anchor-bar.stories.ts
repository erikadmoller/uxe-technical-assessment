import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {withActions} from 'storybook/actions/decorator';
import {html} from 'lit';
import './anchor-bar';

const meta: Meta = {
  component: 'atp-anchor-bar',
  title: 'Components/AnchorBar',
  tags: ['autodocs'],
  parameters: {
    docs: {
      component: 'AnchorBar',
    },
    actions: {},
  },
  decorators: [withActions],
  argTypes: {},
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {},
  render: () => html`
    <div id="scroll-container" style="height: 50vh; overflow: auto;">
      <h2>Some initial content</h2>

      <p style="margin-block-end: var(--atp-space-l)">
        This is some initial page content that appears before the anchor bar. It's here to show that
        the anchor bar is sticky.
      </p>
      <style>
        #parent:has(atp-anchor-bar.at-top) {
          box-shadow: 0 2px 7.5px 0 hsl(245 23% 29% / 0.1);
        }
      </style>
      <div id="parent" style="position: sticky; top: 0;">
        <atp-anchor-bar
          parentBarId="parent"
          scrollOffsetTop="45"
          scrollableViewportId="scroll-container"
        >
          <ul class="atp-anchor-bar-list">
            <li><a href="#zero" aria-current="true">Zero</a></li>
            <li><a href="#one">One</a></li>
            <li><a href="#two">Two</a></li>
            <li><a href="#three">Three</a></li>
          </ul>
        </atp-anchor-bar>
      </div>

      <div style="max-width: 375px">
        <h2 style="margin-block-start: var(--atp-space-l)" id="zero">Section Zero</h2>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>

        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
          laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
          architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
          voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit
          amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut
          labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
          exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
          consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam
          nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
        </p>

        <h2 style="margin-block-start: var(--atp-space-l)" id="one">Section One</h2>
        <p>
          Il brilgue: les tôves lubricilleux se gyrent en vrillant dans le guave. Enmîmés sont les
          gougebosqueux et le mômerade horsgrave.
        </p>
        <p>
          «Garde-toi du Jaseroque, mon fils! La gueule qui mord; la griffe qui prend! Garde-toi de
          l'oiseau Jube, évite Le frumieux Band-à-prend!»
        </p>
        <p>
          Son glaive vorpal en main il vat-à la recherche du fauve manscant; puis arrivé à l'arbre
          Té-Té, il y reste, réfléchissant.
        </p>
        <p>
          Pendant qu'il pense, tout uffusé, le Jaseroque, à l'oeil flambant, vient siblant par le
          bois tullegeais, et burbule en venant.
        </p>
        <p>
          Un deux, un deux, par le milieu, le glaive vorpal fait pat-à-pan! La bête défaite, avec sa
          tête, il rentre gallomphant.
        </p>
        <p>
          «As-tu tué le Jaseroque? Viens à mon coeur, fils rayonnais! Ô Jour frabbejeais! Calleau!
          Callai!» Il cortule dans sa joie.
        </p>
        <p>
          Il brilgue: les tôves lubricilleux se gyrent en vrillant dans le guave. Enmîmés sont les
          gougebosqueux et le mômerade horsgrave.
        </p>
        <p>
          Il brilgue: les tôves lubricilleux se gyrent en vrillant dans le guave. Enmîmés sont les
          gougebosqueux et le mômerade horsgrave.
        </p>
        <p>
          «Garde-toi du Jaseroque, mon fils! La gueule qui mord; la griffe qui prend! Garde-toi de
          l'oiseau Jube, évite Le frumieux Band-à-prend!»
        </p>
        <p>
          Son glaive vorpal en main il vat-à la recherche du fauve manscant; puis arrivé à l'arbre
          Té-Té, il y reste, réfléchissant.
        </p>
        <p>
          Pendant qu'il pense, tout uffusé, le Jaseroque, à l'oeil flambant, vient siblant par le
          bois tullegeais, et burbule en venant.
        </p>
        <p>
          Un deux, un deux, par le milieu, le glaive vorpal fait pat-à-pan! La bête défaite, avec sa
          tête, il rentre gallomphant.
        </p>
        <p>
          «As-tu tué le Jaseroque? Viens à mon coeur, fils rayonnais! Ô Jour frabbejeais! Calleau!
          Callai!» Il cortule dans sa joie.
        </p>
        <p>
          Il brilgue: les tôves lubricilleux se gyrent en vrillant dans le guave. Enmîmés sont les
          gougebosqueux et le mômerade horsgrave.
        </p>

        <h2 style="margin-block-start: var(--atp-space-l)" id="two">Section Two</h2>
        <p>
          I can't pretend a stranger is a long-awaited friend. I guess it was a dream, but even now
          it all seems so vivid to me. Though his mind is not for rent, don't put him down as
          arrogant. I can no longer live under the control of the Federation, but there is no other
          place to go. Sunlight on chrome, the blur of the landscape, every nerve aware. Look around
          this world we made, equality, our stock in trade. They left the planet long ago. We've
          taken care of everything, the words you read, the songs you sing, the pictures that give
          pleasure to your eye.
        </p>
        <p>
          Let the banners be unfurled. Hold the Red Star proudly high in hand. Our world is doing
          fine. Always hopeful, yet discontent, he knows changes aren't permanent - but change is.
          Run like the wind as excitement shivers up and down my spine. Jump to the ground as the
          Turbo slows to cross the borderline. Wind in my hair - shifting and drifting - mechanical
          music - adrenalin surge. Attention all Planets of the Solar Federation, we have assumed
          control. Subdivisions - in the basement bars, in the backs of cars, be cool or be cast
          out.
        </p>
        <p>
          Just think about the average. What use have they for you? And the meek shall inherit the
          earth. Our world could use this beauty. Our great computers fill the hallowed halls. I was
          overwhelmed by both wonder and understanding as I saw a completely different way to life,
          a way that had been crushed by the Federation long ago. We are the Priests of the Temples
          of Syrinx. Just think what we might do. These things just can't be true.
        </p>

        <h2 style="margin-block-start: var(--atp-space-l)" id="three">Section Three</h2>
        <p>
          Muy bien paren, colaboren y escuchen. Ice de vuelta con mi nueva invención. Algo me se
          agarró de mi firmemente; fluye como un arpón de noche y de día. ¿Se detendrá alguna vez?
          Yo, no lo sé. Apaga las luces y voy a brillar. En el extremo me muevo con el micrófono
          como un vandalo. Ilumina el escenario y encera una cabeza como vela.
        </p>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      source: {
        code: `
          <atp-anchor-bar>
            <ul class="atp-anchor-bar-list">
              <li><a href="#zero" aria-current="true">Zero</a></li>
              <li><a href="#one">One</a></li>
              <li><a href="#two">Two</a></li>
              <li><a href="#three">Three</a></li>
            </ul>
          </atp-anchor-bar>

          <h2 id="zero">Section Zero</h2>
          <p>Content for zero</p>
          <h2 id="one">Section One</h2>
          <p>Content for one</p>
          <h2 id="two">Section Two</h2>
          <p>Content for two</p>
          <h2 id="three">Section Three</h2>
          <p>Content for three</p>
        `,
      },
    },
  },
};
