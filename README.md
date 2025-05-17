# CSSBattlesCollab

Collaborative CSSBattles ⚔️

Work on a [cssbattle.dev](https://cssbattle.dev) problem together

https://github.com/ebanner/CSSBattlesCollab/assets/2068912/704ed6fd-3103-4207-8daf-ba3bbd837dfc

## How to run

### Running

1. Start up ECS service (websockets server)
2. Get IP address from ECS service
3. Point namecheap domain to the IP address (`@` for Host)
4. Do `dig collaborative-cssbattle.com +short` until the DNS updates
...
5. Shut down ECS instance

Every 90 days:

Generate a new Let’s Encrypt certificate on a random EC2 instance
   
## Media

Here is a [lightning talk](https://www.youtube.com/watch?v=pzLXQYZpOPU&t=2948s) I gave on CSSBattlesCollab ⚡️
