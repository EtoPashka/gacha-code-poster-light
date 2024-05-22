const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder,  ButtonStyle } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setDMPermission(false)
		.setDefaultMemberPermissions('0')
		.setName('wuwa')
		.setDescription('Post Wuthering Waves promocode')
		.setDescriptionLocalizations({ ru: 'Опубликовать промокод Wuthering Waves' })
		.addStringOption(option =>
			option
				.setName('code')
				.setNameLocalizations({ ru: 'код' })
				.setDescription('Enter promocode')
				.setDescriptionLocalizations({ ru:'Введите промокод' })
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('description')
				.setNameLocalizations({ ru: 'описание' })
				.setDescription('Make a short description of the code')
				.setDescriptionLocalizations({ ru: 'Введите короткое описание кода' })
				.setMinLength(1)
				.setMaxLength(69)),
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });
		// getting values
		const code = interaction.options.getString('code').toUpperCase();
		for (let c of code) {
			if (!RegExp(/[A-Z0-9]/).test(c)) { 
				switch (interaction.locale) {
					case 'ru':
						return interaction.editReply({ content: 'Введены недопустимые символы!', ephemeral: true });
					default:
						return interaction.editReply({ content: 'Forbidden characters entered!', ephemeral: true });
					}
			}
		}
		const desc = interaction.options.getString('description');

		const linkButton = new ButtonBuilder()
			.setEmoji('1242793000279740416')
			.setStyle(ButtonStyle.Secondary)
			.setDisabled(true);
		if (desc) {
			linkButton.setLabel(desc);
		}
		const row = new ActionRowBuilder().addComponents(linkButton);
		await interaction.channel.send({ content: `${code}`, components: [row] });
		const success = { ru: 'Успех!' };
		return interaction.editReply(success[interaction.locale] ?? 'Success!');
	},

};