import { expect } from "chai";

export function expectSuccess(res: any, status: number) {
    expect(res.status).to.equal(status);
    expect(res.body).to.have.property('success', true);
}

export function expectError(res: any, status: number) {
    expect(res.status).to.equal(status);
    expect(res.body).to.have.property('success', false);
    expect(res.body).to.have.property('message').that.is.an('string');
}

export function expectToken(res: any) {
    expect(res.body).to.have.property('token');
    expect(res.body.token).to.have.an('string').with.length.greaterThan(10);
}
