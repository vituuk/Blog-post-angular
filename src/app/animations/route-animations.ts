import {
  trigger,
  transition,
  style,
  query,
  group,
  animate,
  AnimationTriggerMetadata,
} from '@angular/animations';

export const fadeSlideAnimation: AnimationTriggerMetadata = trigger(
  'routeAnimations',
  [
    transition('* <=> *', [
      // Set initial styles for entering and leaving pages
      query(
        ':enter, :leave',
        [
          style({
            position: 'absolute',
            width: '100%',
          }),
        ],
        { optional: true },
      ),

      // Group animations to run in parallel
      group([
        // Leaving page animation (fade out + slide left)
        query(
          ':leave',
          [
            animate(
              '300ms ease-out',
              style({
                opacity: 0,
                transform: 'translateX(-50px)',
              }),
            ),
          ],
          { optional: true },
        ),

        // Entering page animation (fade in + slide from right)
        query(
          ':enter',
          [
            style({
              opacity: 0,
              transform: 'translateX(50px)',
            }),
            animate(
              '400ms 150ms ease-out',
              style({
                opacity: 1,
                transform: 'translateX(0)',
              }),
            ),
          ],
          { optional: true },
        ),
      ]),
    ]),
  ],
);

// Alternative: Simple fade animation (lighter/faster)
export const fadeAnimation: AnimationTriggerMetadata = trigger(
  'fadeAnimation',
  [
    transition('* <=> *', [
      query(
        ':enter, :leave',
        [
          style({
            position: 'absolute',
            width: '100%',
          }),
        ],
        { optional: true },
      ),

      group([
        query(
          ':leave',
          [
            animate(
              '200ms ease-out',
              style({
                opacity: 0,
              }),
            ),
          ],
          { optional: true },
        ),

        query(
          ':enter',
          [
            style({ opacity: 0 }),
            animate(
              '300ms 100ms ease-out',
              style({
                opacity: 1,
              }),
            ),
          ],
          { optional: true },
        ),
      ]),
    ]),
  ],
);

// Alternative: Slide up animation (more dramatic)
export const slideUpAnimation: AnimationTriggerMetadata = trigger(
  'slideUpAnimation',
  [
    transition('* <=> *', [
      query(
        ':enter, :leave',
        [
          style({
            position: 'absolute',
            width: '100%',
          }),
        ],
        { optional: true },
      ),

      group([
        query(
          ':leave',
          [
            animate(
              '300ms ease-out',
              style({
                opacity: 0,
                transform: 'translateY(-30px)',
              }),
            ),
          ],
          { optional: true },
        ),

        query(
          ':enter',
          [
            style({
              opacity: 0,
              transform: 'translateY(30px)',
            }),
            animate(
              '400ms 150ms ease-out',
              style({
                opacity: 1,
                transform: 'translateY(0)',
              }),
            ),
          ],
          { optional: true },
        ),
      ]),
    ]),
  ],
);
