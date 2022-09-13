const Factory = artifacts.require("Factory.sol");
const Organisation = artifacts.require("Organisation.sol");

contract('Factory', (accounts) => {
    let factory;
    const organisations = ['dao', 'other_dao']
    it('Create a factory', async () => {
        factory = await Factory.deployed()
        assert.ok(factory.address !== null)
    })
    organisations.forEach(org => {
        let organisationAddress, registry, organisation;
        it('Produce an organisation named ' + org, async () => {
            await factory.create(org);
            organisationAddress = await factory.organisations(org)
            assert.notEqual(organisationAddress, "0x0000000000000000000000000000000000000000")
        })
        it('Start ' + org, async () => {
            organisation = await Organisation.at(organisationAddress)
            await organisation.start();
        })
        it('Contains contracts ' + org, async () => {
            const contracts = await organisation.getContracts()
            assert.equal(contracts.length, 2)
        })
        it('Contains a Governance ' + org, async () => {
            const governanceAddress = await organisation.registry('Governance')
            assert.notEqual(governanceAddress, "0x0000000000000000000000000000000000000000")
        })
    })
})
