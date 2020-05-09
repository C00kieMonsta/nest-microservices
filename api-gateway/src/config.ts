// JWT configs
export const jwtSecret = 'super secret';
export const expirationTime = '1h';

// Microservices configs
export const microservices = {
    serviceA: {
        name: 'SERVICE_A',
        port: 8880,
    },
    serviceB: {
        name: 'SERVICE_B',
        port: 8881,
    },
    serviceC: {
        name: 'SERVICE_C',
        port: 8882,
    },
    serviceUser: {
        name: 'SERVICE_USER',
        port: 8883,
    },
}